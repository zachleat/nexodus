
if [ "$1" = "persist" ]; then
	persist="--persist=github:zachleat/nexodus"
else
	persist=""
fi

npx @11ty/import bluesky @zachleat.com --output=content/bluesky --cacheduration=4h --assetrefs=absolute $persist
npx @11ty/import fediverse zachleat@fediverse.zachleat.com --output=content/fediverse --cacheduration=4h --assetrefs=absolute $persist