#!/bin/env bash

# Fix display bug from dbus
export DISPLAY=:0
dbus-cleanup-sockets

echo "===="
dbus-launch --version
dbus-launch

echo "===="
echo $USER
id
ls -l /var/run/dbus

echo "===="
pulseaudio --start
