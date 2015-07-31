#!/bin/bash

s3cmd --config=/Users/k/.s3astro  sync pub/. s3://v2.astrostudios.com
s3cmd setacl --config=/Users/k/.s3astro s3://v2.astrostudios.com/ --acl-public --recursive
