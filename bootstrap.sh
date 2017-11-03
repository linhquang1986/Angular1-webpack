#!/usr/bin/env bash

if [ -z $USER_NAME ]; then
  USER_NAME='user'
fi
echo "provisioning for user ($USER_NAME from env):"
sudo -u $USER_NAME whoami
echo ""


# Install system requirements
# target :  base Ubuntu 16.04 - Xenial

# my personal dotfiles and tools
sudo apt-get update
sudo apt-get install -y git vim htop

# Ubunut 16.04 doesn't activate ssh by default... so install it
sudo apt-get install openssh-server -y

sudo -u $USER_NAME cd ~
sudo -u $USER_NAME git clone https://github.com/scottrfrancis/dotfiles.git
sudo -u $USER_NAME cp dotfiles/.bash_profile /home/$USER_NAME/
sudo -u $USER_NAME cp dotfiles/.vimrc /home/$USER_NAME/


sudo apt-get install -y make
# sudo apt install ubuntu-make
sudo apt-get install -y g++

# nodejs for development
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install -y build-essential

# Java
sudo apt-get install -y default-jre
sudo apt-get install -y default-jdk
