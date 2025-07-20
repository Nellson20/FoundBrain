<?php

// src/Serializer/TopicNormalizer.php
namespace App\Serializer;

use App\Entity\User;
use App\Entity\Notification;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class NotificationNormalizer implements NormalizerInterface
{
    public function __construct(
        private UrlGeneratorInterface $router,
        private ObjectNormalizer $normalizer,
        private Security $security
    ) {
    }

    

    public function normalize($topic, ?string $format = null, array $context = []): array
    {
        $data = $this->normalizer->normalize($topic, $format, $context);

        $currentUser=$this->security->getUser();
        if($currentUser instanceof User && $topic->getReadBy()->contains($currentUser)){
            $data['isRead']=true;
        }


        // $data['isRead'] = $this->router->generate('topic_show', [
        //     'id' => $topic->getId(),
        // ], UrlGeneratorInterface::ABSOLUTE_URL);

        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Notification;
    }
}