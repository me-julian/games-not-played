#!/bin/bash

SWAP_ENABLED=$(swapon -s)

if [[ $SWAP_ENABLED ]]
then
    echo "Existing swapfile in use."
else
    echo "No swapfile detected."

    # Create 2GB swap file
    dd if=/dev/zero of=/mnt/swapfile bs=64M count=32

    chown root:root /mnt/swapfile
    chmod 600 /mnt/swapfile

    mkswap /mnt/swapfile
    swapon /mnt/swapfile

    NEW_SWAP_ENABLED=$(swapon -s)

    if [[ $NEW_SWAP_ENABLED ]]
    then
        echo "Successfully created and enabled new swapfile."
    else
        echo "Unexpected issue creating swapfile."
        exit 1
    fi
fi

ENABLE_SWAP_ON_REBOOT=$(grep "/mnt/swapfile swap swap defaults 0 0" /etc/fstab)

if [[ $ENABLE_SWAP_ON_REBOOT ]]
then
    echo "fstab already set to enable swap on reboot."
else
    echo "Configuring fstab to enable swap on reboot."
    echo "/mnt/swapfile swap swap defaults 0 0" >> /etc/fstab
fi

swapon -a