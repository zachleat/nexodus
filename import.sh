
if [ "$1" = "persist" ]; then
	persist="--persist=github:zachleat/nexodus"
else
	persist=""
fi

echo $persist
npx @11ty/import bluesky @zachleat.com --output=bluesky --cacheduration=4h $persist
npx @11ty/import fediverse zachleat@fediverse.zachleat.com --output=fediverse --cacheduration=4h $persist