<?php

namespace App\Config;

enum RulesType: string
{
    case CANCELLATION_RULES = "Politique d' annulation";
    case STAY_RULES  = "Règles de séjour";
    case PET_RULES = "Règles pour les animaux domestiques";
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
