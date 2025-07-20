<?php

namespace App\Config;

enum NotificationType: int
{
    case NEW_POST = 1;
    case NOTE_POST = 2;
    case COMMENT_POST = 3;
    case SHARE_POST = 4;
}