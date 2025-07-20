<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\RestaurantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post as MetadataPost;
use App\Controller\RestaurantPostController;
use App\Controller\RestaurantPutController;

#[ApiResource
(   
    operations:
    [
        new Get(),
        new GetCollection(),
        new Put(),
        new Delete(),
        new MetadataPost (
            controller :RestaurantPostController::class,
            deserialize: false,
        ),
        new MetadataPost(
            uriTemplate: '/restaurants/{id}',
            controller : RestaurantPutController::class,
            deserialize:false,
        )
    ]

)
]
#[ORM\Entity(repositoryClass: RestaurantRepository::class)]
class Restaurant extends Fonctionnality
{
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\OneToOne(targetEntity: Position::class, cascade: ['persist', 'remove'])]
    private ?Position $position = null;

    #[ORM\Column(length: 255)]
    private ?string $openingHours = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $websites = null;

    #[ORM\Column]
    private ?int $contact = null;

    #[ORM\Column]
    private ?int $capacity = null;

    #[ORM\Column]
    private ?int $rating = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $certifications = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $awards = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $cancellationPolicy = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $specialEvents = null;

    #[ORM\ManyToMany(targetEntity: CuisineType::class, mappedBy: 'restaurants')]
    private Collection $cuisineTypes;

    #[ORM\ManyToMany(targetEntity: RestaurantType::class, inversedBy: 'restaurants')]
    private Collection $types;

    #[ORM\ManyToMany(targetEntity: RestaurantService::class, inversedBy: 'restaurants')]
    private Collection $restaurantServices;

    #[ORM\Column]
    private ?int $numberOfTables = null;

    public function __construct()
    {
        parent::__construct();
        $this->cuisineTypes = new ArrayCollection();
        $this->types = new ArrayCollection();
        $this->restaurantServices = new ArrayCollection();
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getPosition(): ?Position
    {
        return $this->position;
    }

    public function setPosition(?Position $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function getOpeningHours(): ?string
    {
        return $this->openingHours;
    }

    public function setOpeningHours(string $openingHours): static
    {
        $this->openingHours = $openingHours;

        return $this;
    }

    public function getWebsites(): ?string
    {
        return $this->websites;
    }

    public function setWebsites(?string $websites): static
    {
        $this->websites = $websites;

        return $this;
    }

    public function getContact(): ?int
    {
        return $this->contact;
    }

    public function setContact(int $contact): static
    {
        $this->contact = $contact;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(int $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getCertifications(): ?string
    {
        return $this->certifications;
    }

    public function setCertifications(?string $certifications): static
    {
        $this->certifications = $certifications;

        return $this;
    }

    public function getAwards(): ?string
    {
        return $this->awards;
    }

    public function setAwards(?string $awards): static
    {
        $this->awards = $awards;

        return $this;
    }

    public function getCancellationPolicy(): ?string
    {
        return $this->cancellationPolicy;
    }

    public function setCancellationPolicy(?string $cancellationPolicy): static
    {
        $this->cancellationPolicy = $cancellationPolicy;

        return $this;
    }

    public function getSpecialEvents(): ?string
    {
        return $this->specialEvents;
    }

    public function setSpecialEvents(string $specialEvents): static
    {
        $this->specialEvents = $specialEvents;

        return $this;
    }

    /**
     * @return Collection<int, CuisineType>
     */
    public function getCuisineTypes(): Collection
    {
        return $this->cuisineTypes;
    }

    public function addCuisineType(CuisineType $cuisineType): static
    {
        if (!$this->cuisineTypes->contains($cuisineType)) {
            $this->cuisineTypes->add($cuisineType);
            $cuisineType->addRestaurant($this);
        }

        return $this;
    }

    public function removeCuisineType(CuisineType $cuisineType): static
    {
        if ($this->cuisineTypes->removeElement($cuisineType)) {
            $cuisineType->removeRestaurant($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, RestaurantType>
     */
    public function getRestauranTypes(): Collection
    {
        return $this->types;
    }

    public function addRestauranType(RestaurantType $restauranType): static
    {
        if (!$this->types->contains($restauranType)) {
            $this->types->add($restauranType);
        }

        return $this;
    }

    public function removeRestauranType(RestaurantType $restauranType): static
    {
        $this->types->removeElement($restauranType);

        return $this;
    }

    /**
     * @return Collection<int, RestaurantService>
     */
    public function getRestaurantServices(): Collection
    {
        return $this->restaurantServices;
    }

    public function addRestaurantService(RestaurantService $restaurantService): static
    {
        if (!$this->restaurantServices->contains($restaurantService)) {
            $this->restaurantServices->add($restaurantService);
        }

        return $this;
    }

    public function removeRestaurantService(RestaurantService $restaurantService): static
    {
        $this->restaurantServices->removeElement($restaurantService);

        return $this;
    }

    public function getNumberOfTables(): ?int
    {
        return $this->numberOfTables;
    }

    public function setNumberOfTables(int $numberOfTables): static
    {
        $this->numberOfTables = $numberOfTables;

        return $this;
    }
}
