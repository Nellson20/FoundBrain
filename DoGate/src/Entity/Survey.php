<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\SurveyController;
use App\Repository\SurveyRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post as MetadataPost;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SurveyRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Put(),
        new Patch(),
        new Delete(),
        new MetadataPost(
            controller: SurveyController::class,
            deserialize: false
        ),
    ]
)]
class Survey
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank([
        'message' => 'Le titre/question ne doit pas être vide !'
    ])]
    #[Groups(['posts_read'])]
    private ?string $title = null;

    #[ORM\OneToOne(inversedBy: 'survey', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Post $post = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE, nullable: true)]
    private ?\DateTimeImmutable $startDate = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE, nullable: true)]
    private ?\DateTimeImmutable $limitDate = null;

    #[ORM\OneToMany(mappedBy: 'survey', targetEntity: SurveyChoice::class, orphanRemoval: true)]
    #[Groups(['posts_read'])]
    #[Assert\Valid]
    private Collection $choices;

    public function __construct(){
        $this->startDate=new \DateTimeImmutable();
        $this->choices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getPost(): ?Post
    {
        return $this->post;
    }

    public function setPost(Post $post): static
    {
        $this->post = $post;

        return $this;
    }

    public function getStartDate(): ?\DateTimeImmutable
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTimeImmutable $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getLimitDate(): ?\DateTimeImmutable
    {
        return $this->limitDate;
    }

    public function setLimitDate(?\DateTimeImmutable $limitDate): static
    {
        $this->limitDate = $limitDate;

        return $this;
    }
    public function isActive(): bool
    {
        $now = new \DateTimeImmutable();

        return $this->limitDate ? $now >= $this->startDate && $now <= $this->limitDate : $now >= $this->startDate;
    }

    /**
     * @return Collection<int, SurveyChoice>
     */
    public function getChoices(): Collection
    {
        return $this->choices;
    }

    public function addChoice(SurveyChoice $choice): static
    {
        if (!$this->choices->contains($choice)) {
            $this->choices->add($choice);
            $choice->setSurvey($this);
        }

        return $this;
    }

    public function removeChoice(SurveyChoice $choice): static
    {
        if ($this->choices->removeElement($choice)) {
            // set the owning side to null (unless already changed)
            if ($choice->getSurvey() === $this) {
                $choice->setSurvey(null);
            }
        }

        return $this;
    }
}
