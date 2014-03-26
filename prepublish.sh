#!/bin/sh
# Linksify / prepublish.sh
# prepublish script for Linksify
# (c) 2013 David (daXXog) Volm ><> + + + <><
# Released under Apache License, Version 2.0:
# http://www.apache.org/licenses/LICENSE-2.0.html  
#################################################

if [ ! -f com-npm-install ]; then
	node make
	rm npm-debug.log >> /dev/null
	mv linksify.js ../.tmp.js
	mv linksify.h ../.tmp.h
else
	rm com-npm-install
fi