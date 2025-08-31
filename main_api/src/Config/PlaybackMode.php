<?php

namespace App\Config;

enum PlaybackMode: string
{
    case RANDOM = 'random';
    case LOOP = 'loop';
    case NORMAL ='normal';
}
