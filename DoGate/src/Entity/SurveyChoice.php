<?php

namespace App\Entity;

use App\Repository\SurveyChoiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SurveyChoiceRepository::class)]
class SurveyChoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['posts_read'])]
    #[Assert\NotBlank([
        'message' => 'Une option ne doit pas être vide !'
    ])]
    private ?string $title = null;

    #[ORM\OneToMany(mappedBy: 'choice', targetEntity: SurveyVote::class, orphanRemoval: true)]
    #[Groups(['posts_read'])]
    private Collection $votes;

    #[ORM\ManyToOne(inversedBy: 'choices')]
    #[ORM\JoinColumn(nullable: false)]
    
    private ?Survey $survey = null;

    public function __construct()
    {
        $this->votes = new ArrayCollection();
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

    /**
     * @return Collection<int, SurveyVote>
     */
    public function getVotes(): Collection
    {
        return $this->votes;
    }

    public function addVote(SurveyVote $vote): static
    {
        if (!$this->votes->contains($vote)) {
            $this->votes->add($vote);
            $vote->setChoice($this);
        }

        return $this;
    }

    public function removeVote(SurveyVote $vote): static
    {
        if ($this->votes->removeElement($vote)) {
            // set the owning side to null (unless already changed)
            if ($vote->getChoice() === $this) {
                $vote->setChoice(null);
            }
        }

        return $this;
    }

    public function getSurvey(): ?Survey
    {
        return $this->survey;
    }

    public function setSurvey(?Survey $survey): static
    {
        $this->survey = $survey;

        return $this;
    }
}
