<?php

namespace App\Entity;

use App\Entity\Breakfast;
use App\Filter\HotelFilter;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use App\Repository\HotelRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\HotelPutController;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\HotelPostController;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\Post as MetadataPost;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: HotelRepository::class)]
#[ApiResource
(   
    operations: 
        [
            new Get(),
            new GetCollection(
                paginationItemsPerPage: 10,
            ),
            new Put(),
            new Delete(),
            new MetaDataPost(
                uriTemplate: '/hotels/{id}',
                controller: HotelPutController::class,
                deserialize: false,
            ),
            new MetadataPost(
                controller : HotelPostController::class,
                deserialize: false,
            ),
        ],
    normalizationContext:
        [
            'groups' => ['hotel_read']
        ],
)]

#[ApiFilter(HotelFilter::class, properties: [
   "localisation" => "exact",
   "name" => "partial", 
])]

class Hotel extends Fonctionnality
{
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: "Le nom est obligatoire")]
    #[Assert\Type(
        type: 'string',
        message: "{{ value }} n'est pas une chaîne valide"
    )]
    #[Assert\Length(
        min: 3,
        minMessage: "Le nom doit contenir au moins {{ limit }} caractères."
    )]
    #[Groups(['hotel_read', 'room_read', 'bungalow_read', 'reservation_read','chalet_read','penthouse_read','suite_read','villa_read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Assert\NotBlank(message: "Le nombre d'étoile est obligatoire.")]
    #[Assert\Type(  
        type: 'integer',
        message: "{{ value }} n'est pas un nombre entier valide."
    )]
    #[Assert\Range(
        min: 1,
        max: 5,
        notInRangeMessage: "Le nombre d'étoile doit etre comprise entre {{ min }} et {{ max }}."
    )]
    #[Groups(['hotel_read'])]
    private ?int $rating = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(
        message: "L'adresse est obligatoire.",
    )]
    #[Assert\Type(
        type: 'string',
        message : "{{value}} n'est pas une adresse valide"
    )]
    #[Assert\Length(
        min: 3,
        minMessage: "L'adresse doit être composé d'au moins {{ limit }} caractères."
    )]
    #[Groups(['hotel_read'])]
    private ?string $address = null; 
    
    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['hotel_read'])]
    #[Assert\NotBlank(
        message: "La déscription est obligatoire.",
    )]
    private ?string $description = null;

    #[ORM\Column()]
    #[Groups(['hotel_read'])]
    private ?int $numberOfRooms = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['hotel_read'])]
    private ?string $website = null;

    #[ORM\OneToOne(inversedBy: 'hotel', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    #[Assert\NotBlank(message:"La position est obligatoire.")]
    private ?Position $position = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    private ?Parking $parking = null;

    #[ORM\ManyToMany(targetEntity: Breakfast::class, inversedBy: 'hotels',cascade:['persist','remove'])]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    private ?Collection $breakfasts = null;

    #[ORM\ManyToMany(targetEntity: Language::class, inversedBy: 'hotels')]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    private Collection $languages;

    #[ORM\OneToMany(mappedBy: 'hotel', targetEntity: Accomodation::class, cascade: ['persist', 'remove'])]
    #[Assert\Valid()]
    private Collection $accomodations;

    #[ORM\ManyToMany(targetEntity: HotelService::class, inversedBy: 'hotels')]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    #[Assert\Count(
        min:1,
        max:10,
        minMessage:"Vous devez ajouter au moins {{ limit }} service.",
        maxMessage:"Vous pouvez ajouter au plus {{ limit }} services."
    )]
    private Collection $hotelServices;

    #[ORM\ManyToMany(targetEntity: Email::class, inversedBy: 'hotels', cascade: ['persist', 'remove'])]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    private Collection $emails;

    #[ORM\ManyToMany(targetEntity: PhoneNumber::class, inversedBy: 'hotels', cascade: ['persist', 'remove'])]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    private Collection $phoneNumbers;

    #[ORM\OneToMany(mappedBy: 'hotel', targetEntity: Rules::class, cascade: ['persist', 'remove'])]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    private Collection $rules;

    #[ORM\ManyToMany(targetEntity: HotelEquipment::class, mappedBy: 'hotels')]
    #[Groups(['hotel_read'])]
    #[Assert\Valid()]
    #[Assert\Count(
        min:1,
        max:10,
        minMessage:"Vous devez ajouter au moins {{ limit }} équipement.",
        maxMessage:"Vous pouvez ajouter au plus {{ limit }} équipements."
    )]
    private Collection $hotelEquipments;


    public function __construct()
    {
        parent::__construct();
        $this->numberOfRooms = 0;
        $this->emails = new ArrayCollection();
        $this->languages = new ArrayCollection();
        $this->accomodations = new ArrayCollection();
        $this->hotelServices = new ArrayCollection();
        $this->emails = new ArrayCollection();
        $this->phoneNumbers = new ArrayCollection();
        $this->rules = new ArrayCollection();
        $this->hotelEquipments = new ArrayCollection();
        $this->breakfasts = new ArrayCollection();
    }

    public function getRating(): ?int
    {
        return $this->rating;
    }

    public function setRating(?int $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): static
    {
        $this->address = $address;

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

    public function getNumberOfRooms(): ?int
    {
        return $this->numberOfRooms;
    }

    public function setNumberOfRooms(int $numberOfRooms): static
    {
        $this->numberOfRooms = $numberOfRooms;

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

    public function getPosition(): ?Position
    {
        return $this->position;
    }

    public function setPosition(?Position $position): static
    {
        $this->position = $position;

        return $this;
    }
    
    /**
     * Get the value of name
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    
    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getParking(): ?Parking
    {
        return $this->parking;
    }

    public function setParking(Parking $parking): static
    {
        $this->parking = $parking;

        return $this;
    }


    /**
     *  @return Collection<int, Breakfast>
     */
    public function getBreakfasts(): Collection
    {
        return $this->breakfasts;
    }

    public function addBreakfast(Breakfast $breakfast): static
    {
        if (!$this->breakfasts->contains($breakfast)) {
            $this->breakfasts->add($breakfast);
        }

        return $this;
    }

    public function removeBreakfast(Breakfast $breakfast): static
    {
        $this->breakfasts->removeElement($breakfast);

        return $this;
    }

    /**
     *  @return Collection<int, Language>
     */
    public function getLanguages(): Collection
    {
        return $this->languages;
    }

    public function addLanguage(Language $language): static
    {
        if (!$this->languages->contains($language)) {
            $this->languages->add($language);
        }

        return $this;
    }

    public function removeLanguage(Language $language): static
    {
        $this->languages->removeElement($language);

        return $this;
    }

    /**
     * @return Collection<int, Accomodation>
     */
    public function getAccomodations(): Collection
    {
        return $this->accomodations;
    }

    public function addAccomodation(Accomodation $accomodation): static
    {
        if (!$this->accomodations->contains($accomodation)) {
            $this->accomodations->add($accomodation);
            $accomodation->setHotel($this);
        }

        return $this;
    }

    public function removeAccomodation(Accomodation $accomodation): static
    {
        if ($this->accomodations->removeElement($accomodation)) {
            // set the owning side to null (unless already changed)
            if ($accomodation->getHotel() === $this) {
                $accomodation->setHotel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, HotelService>
     */
    public function getHotelServices(): Collection
    {
        return $this->hotelServices;
    }

    public function addHotelService(HotelService $hotelService): static
    {
        if (!$this->hotelServices->contains($hotelService)) {
            $this->hotelServices->add($hotelService);
        }

        return $this;
    }

    public function removeHotelService(HotelService $hotelService): static
    {
        $this->hotelServices->removeElement($hotelService);

        return $this;
    }

    

    /**
     * @return Collection<int, Email>
     */
    public function getEmails(): Collection
    {
        return $this->emails;
    }

    public function addEmail(Email $email): static
    {
        if (!$this->emails->contains($email)) {
            $this->emails->add($email);
        }

        return $this;
    }

    public function removeEmail(Email $email): static
    {
        $this->emails->removeElement($email);

        return $this;
    }

    /**
     * @return Collection<int, PhoneNumber>
     */
    public function getPhoneNumbers(): Collection
    {
        return $this->phoneNumbers;
    }

    public function addPhoneNumber(PhoneNumber $phoneNumber): static
    {
        if (!$this->phoneNumbers->contains($phoneNumber)) {
            $this->phoneNumbers->add($phoneNumber);
        }

        return $this;
    }

    public function removePhoneNumber(PhoneNumber $phoneNumber): static
    {
        $this->phoneNumbers->removeElement($phoneNumber);

        return $this;
    }

    /**
     * @return Collection<int, Rules>
     */
    public function getRules(): Collection
    {
        return $this->rules;
    }

    public function addRule(Rules $rule): static
    {
        if (!$this->rules->contains($rule)) {
            $this->rules->add($rule);
            $rule->setHotel($this);
        }

        return $this;
    }

    public function removeRule(Rules $rule): static
    {
        if ($this->rules->removeElement($rule)) {
            // set the owning side to null (unless already changed)
            if ($rule->getHotel() === $this) {
                $rule->setHotel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, HotelEquipment>
     */
    public function getHotelEquipments(): Collection
    {
        return $this->hotelEquipments;
    }

    public function addHotelEquipment(HotelEquipment $hotelEquipment): static
    {
        if (!$this->hotelEquipments->contains($hotelEquipment)) {
            $this->hotelEquipments->add($hotelEquipment);
            $hotelEquipment->addHotel($this);
        }

        return $this;
    }

    public function removeHotelEquipment(HotelEquipment $hotelEquipment): static
    {
        if ($this->hotelEquipments->removeElement($hotelEquipment)) {
            $hotelEquipment->removeHotel($this);
        }

        return $this;
    }
}
