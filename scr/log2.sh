#!/bin/bash

s3cmd --config=/Users/k/.s3astro  sync pub/log2/. s3://v2.astrostudios.com/log2/ --exclude '.DS_Store'
s3cmd setacl --config=/Users/k/.s3astro s3://v2.astrostudios.com/log2/ --acl-public --recursive
