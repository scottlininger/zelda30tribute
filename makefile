getassets: download unpack

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
