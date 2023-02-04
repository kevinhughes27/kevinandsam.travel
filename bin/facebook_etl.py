#!/usr/bin/env python3

import json
from pathlib import Path


# this is the raw export file from facebook.
# it includes all kinds of posts which I need to split
# into types with consistent schemas for gatsby/graphql to work properly
data_path = Path(__file__).parent / "../facebook/your_posts_1.json"

with open(data_path, "r") as f:
    posts = json.load(f)


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
                    # TODO I should copy these images somewhere else to ensure I only commit images I am using.
                    image = data["media"]["uri"]
                    images.append(image)

                elif "place" in data:
                    place = data["place"]
                    # remove link to facebook page for the place
                    if "url" in place:
                        del place["url"]
                    places.append(place)

        if len(images) > 0:
            image_posts.append({
                "text": post["data"][0]["post"],
                "images": images
            })
        elif len(places) == 2:
            # this gets me the travelling from -> to posts
            # it filters out posts about travelling to Guatemala and South Korea because I didn't put the from
            # on these posts originally. it also removes a post about the kilimanjaro video. possible other video
            # only posts are being filtered too.
            pass

    else:
        # print what is being filtered here to be sure
        pass
