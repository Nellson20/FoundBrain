<?php

namespace App\Entity;


use App\Entity\Thumbnail;
use App\Entity\ImageEntity;
use App\Entity\ProfilePicture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\CommentableEntity;
use App\Repository\ImageRepository;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ImageRepository::class)]
#[ApiResource(
    normalizationContext:[
        'groups'=>['image_read'],
    ],
)]
class Image extends CommentableEntity
{
    #[ORM\OneToOne(targetEntity:ImageEntity::class,inversedBy:"image")]
    #[Groups(['image_read'])]
    private $imageEntity;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['image_read'])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'image', targetEntity: ImageEvaluation::class, orphanRemoval: true)]
    #[Groups(['image_read'])]
    private Collection $evaluations;

    #[ORM\Column(type: Types::BIGINT)]
    #[Groups(['image_read'])]
    private ?string $evaluationCount = '0';

    #[ORM\Column(type: Types::BIGINT)]
    #[Groups(['image_read'])]
    private ?string $evaluationSum = '0';

    public function __construct()
    {
        parent::__construct();
        $this->evaluations = new ArrayCollection();
    }

    /**
     * Get the value of imageEntity
     */ 
    public function getImageEntity()
    {
        return $this->imageEntity;
    }

    /**
     * Set the value of imageEntity
     *
     * @return  self
     */ 
    public function setImageEntity($imageEntity)
    {
        $this->imageEntity = $imageEntity;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, ImageEvaluation>
     */
    public function getEvaluations(): Collection
    {
        return $this->evaluations;
    }

    public function addEvaluation(ImageEvaluation $evaluation): static
    {
        if (!$this->evaluations->contains($evaluation)) {
            $this->evaluations->add($evaluation);
            $evaluation->setImage($this);
        }

        return $this;
    }

    public function removeEvaluation(ImageEvaluation $evaluation): static
    {
        if ($this->evaluations->removeElement($evaluation)) {
            // set the owning side to null (unless already changed)
            if ($evaluation->getImage() === $this) {
                $evaluation->setImage(null);
            }
        }

        return $this;
    }

    public function getEvaluationCount(): ?string
    {
        return $this->evaluationCount;
    }

    public function setEvaluationCount(string $evaluationCount): static
    {
        $this->evaluationCount = $evaluationCount;

        return $this;
    }

    public function getEvaluationSum(): ?string
    {
        return $this->evaluationSum;
    }

    public function setEvaluationSum(string $evaluationSum): static
    {
        $this->evaluationSum = $evaluationSum;

        return $this;
    }
}


