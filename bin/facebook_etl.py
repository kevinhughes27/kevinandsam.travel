#!/usr/bin/env python3

import json
import shutil
import io
from pathlib import Path


# this is the raw export file from facebook.
# it includes all kinds of posts which I need to split
# into types with consistent schemas for gatsby/graphql to work properly
facebook_export_dir = Path.home() / "Downloads/facebook-posts"
facebook_export = facebook_export_dir / "your_posts_1.json"

output_dir = Path.home() / "Projects/kevinandsam.travel/facebook"
images_dir = output_dir / "images"

# make dirs
images_dir.mkdir(parents=True, exist_ok=True)

# constants
author = "Kevin"


# fix emoji encoding: https://krvtz.net/posts/how-facebook-got-unicode-wrong.html
class FacebookIO(io.FileIO):
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


# load the data
f = FacebookIO(facebook_export, 'rb')
posts = json.load(f)

# transform
image_posts = []
travelling_to_posts = []

for post in posts:
    # ignore posts without attachments
    if "attachments" in post:
        attachments = post["attachments"]

        images = []
        places = []

        for attachment in attachments:
            for data in attachment["data"]:
                if "media" in data:
                    image = data["media"]["uri"]

                    # only jpg for now
                    if Path(image).suffix == ".jpg":
                        image_name = Path(image).name
                        image_file = image[6:]  # removing leading 'posts/'

                        src = str(facebook_export_dir / image_file)
                        dst = str(images_dir / image_name)
                        rel = f"images/{image_name}"

                        shutil.copy(src, dst)
                        images.append(rel)

                elif "place" in data:
                    place = data["place"]
                    # remove link to facebook page for the place
                    if "url" in place:
                        del place["url"]
                    places.append(place)

        if len(images) > 0:
            # strip hashtags
            og_text = post["data"][0]["post"]
            if "#" in og_text:
                hash_tags_start = og_text.index("#")
                text = og_text[:hash_tags_start]
            else:
                text = og_text

            image_posts.append({
                "text": text,
                "timestamp": post["timestamp"],
                "author": author,
                "images": images
            })
        elif len(places) == 2:
            # this gets me the travelling from -> to posts
            # it filters out posts about travelling to Guatemala and South Korea because I didn't put the from
            # on these posts originally. it also removes a post about the kilimanjaro video. possible other video
            # only posts are being filtered too.
            pass

    else:
        # removes some birthday posts
        # removes an inquiry about ultimate in colombia
        # removes my post about all our airbnbs in bosnia being on Marsala Tita street
        pass


# write output
with open(output_dir / "posts.json", "w") as f:
    f.write(json.dumps(image_posts, indent=2))
