<?php

// src/Serializer/AliasNormalizer.php
namespace App\Serializer;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class AliasNormalizer implements NormalizerInterface
{
    private $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    public function normalize($object, ?string $format = null, array $context = [])
    {
        // Vous pouvez ajouter votre propre logique ici si nécessaire
        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, ?string $format = null)
    {
        return $this->normalizer->supportsNormalization($data, $format);
    }
}
