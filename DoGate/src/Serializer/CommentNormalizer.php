<?php

// src/Serializer/CommentNormalizer.php
namespace App\Serializer;

use App\Entity\Comment;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CommentNormalizer implements ContextAwareNormalizerInterface
{
    private $normalizer;

    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    public function normalize($object, ?string $format = null, array $context = []): array
    {
        if ($object instanceof Comment) {
            $data = $this->normalizer->normalize($object, $format, $context);
            if (isset($data['replies'])) {
                $data['replies'] = array_slice($data['replies'], 0, 3); // Limite les réponses à 1
            }
            return $data;
        }
        return $this->normalizer->normalize($object, $format, $context);
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Comment;
    }
}
