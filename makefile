.PHONY: assets.md5

getassets: download unpack

assets: download

download:
	python2 manage_assets.py download

unpack:
	python2 manage_assets.py unpack

pack:
	python2 manage_assets.py pack

unzip: zelda30tribute.zip
	python2 manage_assets.py unzip

clean:
	rm -rf assets
	rm -f zelda30tribute.zip

assets.md5: assets
	find ./assets -type f -exec md5sum {} \; > assets.md5
