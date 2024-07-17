'use client'

import React, { useEffect } from 'react';
import twemoji from 'twemoji';

const EmojiFlag = ({emoji}: {emoji: string}) => {
    useEffect(() => {
    twemoji.parse(document.body);
    }, []);

    return (
    <span className="inline w-4 h-4">
        {emoji}
    </span>
    );
}

export default EmojiFlag;