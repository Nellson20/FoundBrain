<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PositionRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PositionRepository::class)]
class Position
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private ?string $id = null;

    #[ORM\Column]
    #[Groups(['position_read', 'hotel_read'])]
    #[Assert\NotBlank(message: "Une latitude est obligatoire.")]
    #[Assert\Regex(
        pattern: "/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?)$/",
        message: "La latitude n'est pas valide."
    )]
    private ?float $lat = null;

    #[ORM\Column]
    #[Groups(['position_read', 'hotel_read'])]
    #[Assert\NotBlank(message: "Une longitude est obligatoire.")]
    #[Assert\Regex(
        pattern: "/^[-]?((((1[0-7][0-9])|([0-9]?[0-9]))\.(\d+))|180(\.0+)?)$/",
        message: "La longitude n'est pas valide."
    )]
    private ?float $lng = null;

    #[ORM\OneToOne(mappedBy: 'position', cascade: ['persist'])]
    private ?Hotel $hotel = null;


    public function getId(): ?string
    {
        return $this->id;
    }

    public function getLat(): ?float
    {
        return $this->lat;
    }

    public function setLat(?float $latitude): static
    {
        $this->lat = $latitude;

        return $this;
    }

    public function getLng(): ?float
    {
        return $this->lng;
    }

    public function setLng(?float $longitude): static
    {
        $this->lng = $longitude;

        return $this;
    }

    public function getHotel(): ?Hotel
    {
        return $this->hotel;
    }
}
