<?php

namespace App\Config;

enum NotificationStatus: string
{
    case UNREAD = 'non lu';
    case READ = 'lu';
}