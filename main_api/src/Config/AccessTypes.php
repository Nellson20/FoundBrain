<?php

namespace App\Config;

enum AccessTypes: string
{
    case ADMIN = 'ADMIN';
    case EDITOR = 'EDITOR';
    case MODERATOR = 'MODERATOR';
    case ADVERTISER = 'ADVERTISER';
    case ANALYST = 'ANALYST';

}