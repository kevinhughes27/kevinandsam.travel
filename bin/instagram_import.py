#!/usr/bin/env python3

import json
import shutil
import io
from datetime import datetime
from pathlib import Path
from videoprops import get_video_properties


export_file = Path.home() / "Downloads/instagram-export/content/posts_1.json"
output_dir = Path.home() / "Projects/kevinandsam.travel/instagram"
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
    """ETL the data to a usable schema. Gatsby/GraphQL need fields to have consistent types
    so I need to split the generic 'media' field into type specific top-level fields"""

    def __init__(self, export_file: Path, output_dir: Path, author: str):
        self.export_file = export_file
        self.export_dir = export_file.parents[1]
        self.output_dir = output_dir
        self._mkdirs()

    def _mkdirs(self):
        self.images_dir = output_dir / "images"
        self.videos_dir = output_dir / "videos"
        self.images_dir.mkdir(parents=True, exist_ok=True)
        self.videos_dir.mkdir(parents=True, exist_ok=True)

    def run(self):
        f = FacebookIO(self.export_file, 'rb')
        self.ig_posts = json.load(f)
        self.transform()
        self.save()

    def transform(self):
        self.posts = []

        for post in self.ig_posts:
            images = []
            videos = []

            for media in post["media"]:
                media_file = media["uri"]

                if Path(media_file).suffix == ".jpg" or Path(media_file).suffix == ".webp":
                    image_name = Path(media_file).name

                    src = str(self.export_dir / media_file)
                    dst = str(self.images_dir / image_name)
                    rel = f"images/{image_name}"

                    shutil.copy(src, dst)
                    images.append(rel)

                else:  # assume video if no extension
                    video_name = Path(media_file).name

                    src = str(self.export_dir / media_file)
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

            # text
            if "title" in post:
                text = post["title"]
            else:
                text = post["media"][0]["title"]

            # strip hashtags when more than 3
            if text.count("#") > 2:
                hash_tags_start = text.index("#")
                text = text[:hash_tags_start]

            # timestamp
            if "creation_timestamp" in post:
                timestamp = post["creation_timestamp"]
            else:
                timestamp = post["media"][0]["creation_timestamp"]

            # filter range because instagram can only export everything
            post_date = datetime.fromtimestamp(timestamp)
            trip_start = datetime(2018, 2, 1)
            trip_end = datetime(2019, 3, 20)

            if post_date >= trip_start and post_date <= trip_end:
                self.posts.append({
                    "text": text,
                    "timestamp": timestamp,
                    "author": author,
                    "images": images,
                    "videos": videos
                })

    def save(self):
        with open(self.output_dir / "instagram_posts.json", "w") as f:
            f.write(json.dumps(self.posts, indent=2))


if __name__ == "__main__":
    Importer(export_file, output_dir, author).run()
