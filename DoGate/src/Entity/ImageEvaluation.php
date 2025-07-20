<?php

namespace App\Entity;

use App\Entity\Image;
use App\Entity\Evaluation;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Link;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as PostMetadata;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity]
#[ApiResource]
#[ApiResource(
    normalizationContext: [
        'groups' => ['eval_read'],
    ],
    uriTemplate: '/images/{id}/evaluations',
    uriVariables: [
        'id' => new Link(
            fromClass: Image::class,
            fromProperty: 'evaluations'
        )
    ],
    operations: [
        new GetCollection()
    ]
)]
class ImageEvaluation extends Evaluation
{
    #[ORM\ManyToOne(inversedBy: 'evaluations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Image $image = null;

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): static
    {
        $this->image = $image;

        return $this;
    }
}