#!/usr/bin/env python3

import json
import shutil
import io
from pathlib import Path
from videoprops import get_video_properties


facebook_export = Path.home() / "Downloads/facebook-posts/your_posts_1.json"
output_dir = Path.home() / "Projects/kevinandsam.travel/facebook"
author = "Kevin"


class FacebookIO(io.FileIO):
    """fix emoji encoding: https://krvtz.net/posts/how-facebook-got-unicode-wrong.html"""

    def read(self, size: int = -1) -> bytes:
        data: bytes = super(FacebookIO, self).readall()
        new_data: bytes = b''
        i: int = 0
        while i < len(data):
            # \u00c4\u0085
            # 0123456789ab
            if data[i:].startswith(b'\\u00'):
                u: int = 0
                new_char: bytes = b''
                while data[i + u:].startswith(b'\\u00'):
                    hex = int(bytes([data[i + u + 4], data[i + u + 5]]), 16)
                    new_char = b''.join([new_char, bytes([hex])])
                    u += 6

                char: str = new_char.decode('utf-8')
                new_chars: bytes = bytes(json.dumps(char).strip('"'), 'ascii')
                new_data += new_chars
                i += u
            else:
                new_data = b''.join([new_data, bytes([data[i]])])
                i += 1

        return new_data


class Importer:
    """ETL the facebook data to a usable schema. Gatsby/GraphQL need fields to have consistent types
    so I need to split the generic 'attachments' field into type specific top-level fields"""

    def __init__(self, export_file: Path, output_dir: Path, author: str):
        self.export_file = export_file
        self.export_dir = export_file.parent
        self.output_dir = output_dir
        self._mkdirs()

    def _mkdirs(self):
        self.images_dir = output_dir / "images"
        self.videos_dir = output_dir / "videos"
        self.images_dir.mkdir(parents=True, exist_ok=True)
        self.videos_dir.mkdir(parents=True, exist_ok=True)

    def run(self):
        f = FacebookIO(self.export_file, 'rb')
        self.fb_posts = json.load(f)
        self.transform()
        self.save()

    def transform(self):
        self.posts = []

        for post in self.fb_posts:
            # ignore posts without attachments
            if "attachments" in post:
                attachments = post["attachments"]

                images = []
                videos = []
                places = []

                for attachment in attachments:
                    for data in attachment["data"]:
                        if "media" in data:
                            media = data["media"]["uri"]

                            if Path(media).suffix == ".jpg":
                                image = media
                                image_name = Path(image).name
                                image_file = image[6:]  # removing leading 'posts/'

                                src = str(self.export_dir / image_file)
                                dst = str(self.images_dir / image_name)
                                rel = f"images/{image_name}"

                                shutil.copy(src, dst)
                                images.append(rel)

                            elif Path(media).suffix == ".mp4" or Path(media).match("posts/media/videos/*"):
                                video = media
                                video_name = Path(video).name
                                video_file = video[6:]  # removing leading 'posts/'

                                src = str(self.export_dir / video_file)
                                dst = str(self.videos_dir / video_name)
                                rel = f"videos/{video_name}"

                                shutil.copy(src, dst)

                                props = get_video_properties(dst)

                                videos.append({
                                    "src": rel,
                                    "width": props["width"],
                                    "height": props["height"],
                                    "duration": props["duration"],
                                })

                            else:
                                print(f"unknown media attachment: {media}")

                        elif "place" in data:
                            place = data["place"]
                            # remove link to facebook page for the place
                            if "url" in place:
                                del place["url"]
                            places.append(place)

                # post text
                try:
                    # strip hashtags
                    og_text = post["data"][0]["post"]
                    if "#" in og_text:
                        hash_tags_start = og_text.index("#")
                        text = og_text[:hash_tags_start]
                    else:
                        text = og_text
                except (KeyError, IndexError):
                    # filters:
                    # post recommending ocua
                    # sharing sam's post about her top ten
                    continue

                if len(images) > 0 or len(videos) > 0 or len(places) > 0:
                    # len(places) == 2
                    # gets me the travelling from -> to posts.

                    self.posts.append({
                        "text": text,
                        "timestamp": post["timestamp"],
                        "author": author,
                        "images": images,
                        "videos": videos,
                        "places": places
                    })
            else:
                # removes some birthday posts
                # removes an inquiry about ultimate in colombia
                # removes my post about all our airbnbs in bosnia being on Marsala Tita street
                pass

    def save(self):
        with open(self.output_dir / "posts.json", "w") as f:
            f.write(json.dumps(self.posts, indent=2))


if __name__ == "__main__":
    Importer(facebook_export, output_dir, author).run()
