<?php

namespace App\Entity;
use Assert\NotBlank;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\EquipmentsRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ApiResource()]
#[ORM\Entity(repositoryClass: EquipmentsRepository::class)]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name:"equipment_type", type: "string")]
#[ORM\DiscriminatorMap([
    'hotelEquipment' => HotelEquipment::class,
    'accomodationEquipment' => AccomodationEquipment::class,
    'bathroomEquipment' => BathRoomEquipment::class,
])]
abstract class Equipments
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["reservation_read", "hotel_read", 'room_read', 'bungalow_read'])]
    #[Assert\NotBlank(message:"Le titre est obligatoire.")]
    private ?string $equipmentTitle = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getEquipmentTitle(): ?string
    {
        return $this->equipmentTitle;
    }

    public function setEquipmentTitle(?string $equipmentTitle): static
    {
        $this->equipmentTitle = $equipmentTitle;

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

}
