#!/bin/env bash

# Fix display bug from dbus
export DISPLAY=:0
dbus-cleanup-sockets

echo "Starting dbus"
dbus-launch

echo "Starting pulseaudio"
pulseaudio --start
