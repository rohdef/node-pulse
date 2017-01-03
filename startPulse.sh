#!/bin/env bash

dbus-cleanup-sockets

echo "===="
dbus-launch --version
dbus-launch

echo "===="
echo $USER
id
ls -l /var/run/dbus


echo "===="
pulseaudio -v
sudo pulseaudio --start
