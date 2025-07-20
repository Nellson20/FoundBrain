<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Entity\Amount;
use App\Config\ParkingType;
use App\Config\LocationParking;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\ParkingRepository;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Doctrine\ORM\Mapping\PrePersist;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ParkingRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource]
class Parking
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private string $id;

    #[ORM\Column]
    #[Groups(['hotel_read'])]
    #[Assert\NotBlank(message:"Le nombre de place est requis.")]
    #[Assert\GreaterThan(
        value:0,
        message:"Le nombre de place doit être supérieur à {{ compared_value }}"
    )]
    private ?int $numberOfPlaces = null;

    #[ORM\Column(type: "string", enumType: LocationParking::class)]
    #[Groups(['hotel_read'])]
    #[Assert\NotBlank(message:"L'emplacement du parking est obligatoire.")]
    #[Assert\Choice(
        callback:[LocationParking::class,'values'],
        message:"Vous devez choisir entre {{ choices }}"
    )]
    private $locationParking;

    #[ORM\Column(type: "string", enumType: ParkingType::class)]
    #[Groups(['hotel_read'])]
    #[Assert\NotBlank(message:"Le type de parking est obligatoire.")]
    #[Assert\Choice(
        callback:[ParkingType::class,'values'],
        message:"Vous devez choisir entre {{ choices }}"
    )]
    private $parkingType;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    private ?Amount $pricePlace = null;


    #[PrePersist]
    private function prePersist()
    {
        $this->locationParking=LocationParking::from($this->getLocationParking());
        $this->parkingType=ParkingType::from($this->getLocationParking());
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getNumberOfPlaces(): ?int
    {
        return $this->numberOfPlaces;
    }

    public function setNumberOfPlaces(?int $numberOfPlaces): static
    {
        $this->numberOfPlaces = $numberOfPlaces;

        return $this;
    }

    public function getLocationParking():string
    {
        return $this->locationParking;
    }

    public function setLocationParking(?string $locationParking) 
    {
        $this->locationParking = $locationParking;

        return $this;
    }

    public function getParkingType():string
    {
        return $this->parkingType;
    }

    public function setParkingType(?string $parkingType)
    {
        $this->parkingType = $parkingType;

        return $this;
    }

    public function getPricePlace(): ?Amount
    {
        return $this->pricePlace;
    }

    public function setPricePlace(Amount $pricePlace): static
    {
        $this->pricePlace = $pricePlace;

        return $this;
    }
}
