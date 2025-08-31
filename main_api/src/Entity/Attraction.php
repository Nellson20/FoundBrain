<?php

namespace App\Entity;

use App\Repository\AttractionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity(repositoryClass: AttractionRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name:"discriminator", type: "string")]
#[ORM\DiscriminatorMap([
    'park' => Park::class,
    'museum' => Museum::class,
    'monument' =>Monument::class,
    'shoppingCenter'=> ShoppingCenter::class,
    'gymnasium' =>Gymnasium::class
])]
class Attraction extends Fonctionnality
{
    
    #[ORM\Column(length: 255)]
    private ?string $description = null;
    
    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\NotBlank(message: "This field must not be empty")]
    private ?\DateTimeInterface $openHours = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\NotBlank(message: "This field must not be empty")]
    private ?\DateTimeInterface $closeHours = null;


    #[ORM\ManyToMany(targetEntity: ThingsToDo::class, inversedBy: 'attractions')]
    private Collection $thingsToDo;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $placeToStay = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $policy = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $website = null;


    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Position $position = null;

    public function __construct()
    {
        parent::__construct();
        $this->thingsToDo = new ArrayCollection();
    }
    
    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }


    public function getOpenHours(): ?\DateTimeInterface
    {
        return $this->openHours;
    }

    public function setOpenHours(\DateTimeInterface $openHours): static
    {
        $this->openHours = $openHours;

        return $this;
    }

    public function getCloseHours(): ?\DateTimeInterface
    {
        return $this->closeHours;
    }

    public function setCloseHours(\DateTimeInterface $closeHours): static
    {
        $this->closeHours = $closeHours;

        return $this;
    }

    public function getPosition(): ?Position
    {
        return $this->position;
    }

    public function setPosition(Position $position): static
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return Collection<int, ThingsToDo>
     */
    public function getThingsToDo(): Collection
    {
        return $this->thingsToDo;
    }

    public function addThingsToDo(ThingsToDo $thingsToDo): static
    {
        if (!$this->thingsToDo->contains($thingsToDo)) {
            $this->thingsToDo->add($thingsToDo);
        }

        return $this;
    }

    public function removeThingsToDo(ThingsToDo $thingsToDo): static
    {
        $this->thingsToDo->removeElement($thingsToDo);

        return $this;
    }

    public function getPlaceToStay(): ?string
    {
        return $this->placeToStay;
    }

    public function setPlaceToStay(?string $placeToStay): static
    {
        $this->placeToStay = $placeToStay;

        return $this;
    }

    public function getPolicy(): ?string
    {
        return $this->policy;
    }

    public function setPolicy(?string $policy): static
    {
        $this->policy = $policy;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): static
    {
        $this->website = $website;

        return $this;
    }


}