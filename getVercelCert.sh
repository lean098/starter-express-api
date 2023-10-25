#!/usr/bin/bash
openssl s_client -servername vercel.app -connect vercel.app:443 | openssl x509 -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64