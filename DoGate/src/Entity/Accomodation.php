<?php

namespace App\Entity;

use App\Entity\Room;
use App\Entity\Hotel;
use App\Entity\Suite;
use App\Entity\Villa;
use App\Entity\Amount;
use App\Entity\Chalet;
use App\Entity\Picture;
use App\Entity\Bungalow;
use App\Entity\Penthouse;
use App\Entity\Reservation;
use ApiPlatform\Metadata\Link;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\AccomodationRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AccomodationRepository::class)]
#[ApiResource]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name:"accomodation_type", type: "string")]
#[ORM\DiscriminatorMap([
    'room' => Room::class,
    'bungalow' => Bungalow::class,
    'suite' => Suite::class,
    'chalet' => Chalet::class,
    'pentHouse' => Penthouse::class,
    'Villa' => Villa::class
])]

#[ApiResource(
    uriTemplate:'/hotels/{hotelId}/accomodations',
    uriVariables:[
        'hotelId' => new Link(fromClass: Hotel::class, toProperty: 'hotel'),
    ],
    operations:
    [
        new GetCollection()
    ]
)]

abstract class Accomodation
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(['room_read','bungalow_read'])]
    private string $id;

    public const MAX_NUMBER = 10; 

    #[ORM\Column(length: 255)]
    #[Groups(['hotel_read', 'reservation_read', 'room_read', 'bungalow_read'])]
    private ?string $type = null;

    #[ORM\Column]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private ?int $size = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['hotel_read', 'reservation_read', 'room_read'])]
    private ?string $view = null;

    #[ORM\Column]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private ?bool $balcony = null;

    #[ORM\Column]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private ?int $numberOfBeds = null;

    #[ORM\Column]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private ?bool $petsAllowed = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'accomodations')]
    #[Groups(['room_read', 'bungalow_read','reservation_read'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Hotel $hotel = null;

    #[ORM\OneToMany(mappedBy: 'accomodation', targetEntity: Picture::class, cascade:["persist", "remove"])]
    #[Groups(['room_read', 'bungalow_read','reservation_read'])]
    private Collection $pictures;

    
    #[ORM\OneToMany(mappedBy: 'accomodation', targetEntity: Reservation::class)]
    private Collection $reservations;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[Groups(['room_read', 'bungalow_read','reservation_read'])]
    private ?Capacity $capacity = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private ?Amount $pricePerNight = null;

    #[ORM\ManyToMany(targetEntity: AccomodationService::class, mappedBy: 'accomodations')]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private Collection $accomodationServices;

    #[ORM\ManyToMany(targetEntity: AccomodationEquipment::class, mappedBy: 'accomodations')]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private Collection $accomodationEquipments;

    #[ORM\ManyToMany(targetEntity: BathRoomEquipment::class, mappedBy: 'accomodations')]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read'])]
    private Collection $bathRoomEquipments;

    public function __construct()
    {
        $this->pictures = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->accomodationServices = new ArrayCollection();
        $this->accomodationEquipments = new ArrayCollection();
        $this->bathRoomEquipments = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getView(): ?string
    {
        return $this->view;
    }

    public function setView(?string $view): static
    {
        $this->view = $view;

        return $this;
    }

    public function isBalcony(): ?bool
    {
        return $this->balcony;
    }

    public function setBalcony(bool $balcony): static
    {
        $this->balcony = $balcony;

        return $this;
    }

    public function getNumberOfBeds(): ?int
    {
        return $this->numberOfBeds;
    }

    public function setNumberOfBeds(int $numberOfBeds): static
    {
        $this->numberOfBeds = $numberOfBeds;

        return $this;
    }

    public function isPetsAllowed(): ?bool
    {
        return $this->petsAllowed;
    }

    public function setPetsAllowed(bool $petsAllowed): static
    {
        $this->petsAllowed = $petsAllowed;

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

    public function getHotel(): ?Hotel
    {
        return $this->hotel;
    }

    public function setHotel(?Hotel $hotel): static
    {
        $this->hotel = $hotel;

        return $this;
    }

    /**
     * @return Collection<int, Picture>
     */
    public function getPictures(): Collection
    {
        return $this->pictures;
    }

    public function addPicture(Picture $picture): static
    {
        if (!$this->pictures->contains($picture)) {
            $this->pictures->add($picture);
            $picture->setAccomodation($this);
        }

        return $this;
    }

    public function removePicture(Picture $picture): static
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getAccomodation() === $this) {
                $picture->setAccomodation(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setAccomodation($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getAccomodation() === $this) {
                $reservation->setAccomodation(null);
            }
        }

        return $this;
    }

    public function getCapacity(): ?Capacity
    {
        return $this->capacity;
    }

    public function setCapacity(?Capacity $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }
    public function getCapacityTotal()
    {
        return $this->capacity->getCapacityTotal();
    }

    public function getPricePerNight(): ?Amount
    {
        return $this->pricePerNight;
    }

    public function setPricePerNight(Amount $pricePerNight): static
    {
        $this->pricePerNight = $pricePerNight;

        return $this;
    }

    /**
     * @return Collection<int, AccomodationService>
     */
    public function getAccomodationServices(): Collection
    {
        return $this->accomodationServices;
    }

    public function addAccomodationService(AccomodationService $accomodationService): static
    {
        if (!$this->accomodationServices->contains($accomodationService)) {
            $this->accomodationServices->add($accomodationService);
            $accomodationService->addAccomodation($this);
        }

        return $this;
    }

    public function removeAccomodationService(AccomodationService $accomodationService): static
    {
        if ($this->accomodationServices->removeElement($accomodationService)) {
            $accomodationService->removeAccomodation($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, AccomodationEquipment>
     */
    public function getAccomodationEquipments(): Collection
    {
        return $this->accomodationEquipments;
    }

    public function addAccomodationEquipment(AccomodationEquipment $accomodationEquipment): static
    {
        if (!$this->accomodationEquipments->contains($accomodationEquipment)) {
            $this->accomodationEquipments->add($accomodationEquipment);
            $accomodationEquipment->addAccomodation($this);
        }

        return $this;
    }

    public function removeAccomodationEquipment(AccomodationEquipment $accomodationEquipment): static
    {
        if ($this->accomodationEquipments->removeElement($accomodationEquipment)) {
            $accomodationEquipment->removeAccomodation($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, BathRoomEquipment>
     */
    public function getBathRoomEquipments(): Collection
    {
        return $this->bathRoomEquipments;
    }

    public function addBathRoomEquipment(BathRoomEquipment $bathRoomEquipment): static
    {
        if (!$this->bathRoomEquipments->contains($bathRoomEquipment)) {
            $this->bathRoomEquipments->add($bathRoomEquipment);
            $bathRoomEquipment->addAccomodation($this);
        }

        return $this;
    }

    public function removeBathRoomEquipment(BathRoomEquipment $bathRoomEquipment): static
    {
        if ($this->bathRoomEquipments->removeElement($bathRoomEquipment)) {
            $bathRoomEquipment->removeAccomodation($this);
        }

        return $this;
    }
}
