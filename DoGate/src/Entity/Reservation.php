<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Entity\Author;
use App\Repository\ReservationRepository;
use App\Controller\ReservationPostController;
use ApiPlatform\Metadata\Post as MetaDataPost;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(
    operations:
    [
        new GetCollection(),
        new Get(),
        new MetaDataPost(
            controller: ReservationPostController::class,
            deserialize : false
        ),
        new Put(),
        new Delete(),
    ],
    normalizationContext:
    [
        "groups" => ["reservation_read"]
    ],
)]
class Reservation
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    #[Groups(["reservation_read"])]
    private ?string $id = null;

    #[ORM\Column]
    #[Groups(['hotel_read', 'reservation_read'])]
    private ?\DateTimeImmutable $start = null;

    #[ORM\Column]
    #[Groups(['hotel_read', 'reservation_read'])]
    private ?\DateTimeImmutable $end = null;

    #[ORM\Column]
    #[Groups(["reservation_read"])]
    private ?int $priceTotal = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Capacity $capacity = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Accomodation $accomodation = null;

    #[ORM\ManyToOne(inversedBy: 'reservation')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Author $author = null;

    public function getId()
    {
        return $this->id;
    }


    public function getStart(): ?\DateTimeImmutable
    {
        return $this->start;
    }

    public function setStart(\DateTimeImmutable $start): static
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeImmutable
    {
        return $this->end;
    }

    public function setEnd(\DateTimeImmutable $end): static
    {
        $this->end = $end;

        return $this;
    }

    public function getPriceTotal(): ?int
    {
        return $this->priceTotal;
    }

    public function setPriceTotal(int $priceTotal): static
    {
        $this->priceTotal = $priceTotal;

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

    public function getAccomodation(): ?Accomodation
    {
        return $this->accomodation;
    }

    public function setAccomodation(?Accomodation $accomodation): static
    {
        $this->accomodation = $accomodation;

        return $this;
    }

    public function getAuthor(): ?Author
    {
        return $this->author;
    }

    public function setAuthor(?Author $author): static
    {
        $this->author = $author;

        return $this;
    }

}
