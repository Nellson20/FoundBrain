<?php

namespace App\Entity;

use App\Entity\Picture;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\MenuRepository;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\MenuPutController;
use App\Controller\MenuPostController;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Metadata\Post as MetaDataPost;
use Doctrine\Common\Collections\ArrayCollection;


#[ORM\Entity(repositoryClass: MenuRepository::class)]
#[ApiResource(
    operations:
    [
        new GetCollection(),
        new Get(),
        new Put(),
        new Delete(),
        new MetaDataPost(
            uriTemplate: '/rooms/{id}',
            controller: MenuPutController::class,
            deserialize: false,
        ),
        new MetaDataPost(
            controller : MenuPostController::class,
            deserialize: false,
        ),
    ]
)]
class Menu
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]  
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private string $id;


    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $price = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $allergens = null;

    #[ORM\Column(nullable: true)]
    private ?int $preparationTime = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $accompaniments = null;

    #[ORM\OneToMany(mappedBy: 'menu', targetEntity: Picture::class)]
    private Collection $pictures;

    #[ORM\ManyToOne(inversedBy: 'menus')]
    private ?MenuCategory $menuCategory = null;

    public function __construct()
    {
        $this->pictures = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
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

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?int
    {
        return $this->price;
    }

    public function setPrice(int $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getAllergens(): ?string
    {
        return $this->allergens;
    }

    public function setAllergens(?string $allergens): static
    {
        $this->allergens = $allergens;

        return $this;
    }

    public function getPreparationTime(): ?int
    {
        return $this->preparationTime;
    }

    public function setPreparationTime(?int $preparationTime): static
    {
        $this->preparationTime = $preparationTime;

        return $this;
    }

    public function getAccompaniments(): ?string
    {
        return $this->accompaniments;
    }

    public function setAccompaniments(?string $accompaniments): static
    {
        $this->accompaniments = $accompaniments;

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
            $picture->setMenu($this);
        }

        return $this;
    }
    public function removePicture(Picture $picture): static
    {
        if ($this->pictures->removeElement($picture)) {
            // set the owning side to null (unless already changed)
            if ($picture->getMenu() === $this) {
                $picture->setMenu(null);
            }
        }

        return $this;
    }

    public function getMenuCategory(): ?MenuCategory
    {
        return $this->menuCategory;
    }

    public function setMenuCategory(?MenuCategory $menuCategory): static
    {
        $this->menuCategory = $menuCategory;

        return $this;
    }
}
