<?php
namespace App\Enum;

enum EventType: string
{
    case COMMENT = 'COMMENT';
    case REACTION = 'REACTION';
    case SAVE = 'SAVE';
    case PUBLICATIONS = 'PUBLICATIONS';
    case SCREEN = 'SCREEN';
    case VISITE = 'VISITE';
    case SEARCH = 'SEARCH';
    case INVITATION = 'INVITATION';
}
