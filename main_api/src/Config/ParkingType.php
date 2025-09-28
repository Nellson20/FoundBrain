<?php

namespace App\Config;

enum ParkingType: string
{
    case PUBLIC = 'publique';
    case PRIVATE = 'privée';
    
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
