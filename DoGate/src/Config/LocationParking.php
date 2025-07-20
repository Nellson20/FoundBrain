<?php

namespace App\Config;

enum LocationParking: string
{
    case PLACE = 'sur place';
    case APPROXIMATE = 'à proximité';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
