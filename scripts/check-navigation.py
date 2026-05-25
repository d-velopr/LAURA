#!/usr/bin/env python3
from pathlib import Path
import re
import sys

RETIRED_HEADER_ITEMS = {
    "community.html": "Community should not be a top-level header item.",
    "nav-contact": "Contact should live in About Us and mobile navigation, not as a desktop CTA.",
    "events.html#gallery": "Events should link to Meetings & Gatherings and Annual Resource Fair.",
    "impact.html#youth": "Get Support should link to Resources, not L.A.U.R.A Youth.",
    "L.A.U.R.A Youth": "Get Support should label the second dropdown item Resources.",
}

REQUIRED_HEADER_ITEMS = [
    "About Us",
    "Get Support",
    "Victim Support Program",
    "Resources",
    "Get Involved",
    "Youth Program",
    "Volunteer",
    "Events",
    "Meetings &amp; Gatherings",
    "Annual Resource Fair",
    "Donate",
]


def get_header(html):
    start = html.find("<!-- Navigation")
    if start == -1:
        return None

    end = html.find("<!-- /Navigation -->", start)
    if end == -1:
        end = html.find("<main", start)
    if end == -1:
        return html[start:]
    return html[start:end]


def main():
    failures = []
    for path in sorted(Path(".").glob("*.html")):
        header = get_header(path.read_text(errors="ignore"))
        if header is None:
            continue

        for item in REQUIRED_HEADER_ITEMS:
            if item not in header:
                failures.append(f"{path}: missing `{item}` in header")

        for item, reason in RETIRED_HEADER_ITEMS.items():
            if item in header:
                failures.append(f"{path}: retired header item `{item}` found. {reason}")

        duplicate_navigation_comments = len(re.findall(r"<!-- Navigation", header))
        if duplicate_navigation_comments > 1:
            failures.append(f"{path}: duplicate navigation comments found in header")

    if failures:
        print("Navigation drift found:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Navigation headers match docs/navigation.md.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
