<?php

namespace App\Entity;

use App\Repository\StoreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post as MetadataPost;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\StorePostController;
use App\Controller\StorePutController;

#[ORM\Entity(repositoryClass: StoreRepository::class)]
#[ApiResource
(   
    operations: 
        [
            new Get(),
            new GetCollection(),
            new Put(),
            new Delete(),
            new MetaDataPost(
                uriTemplate: '/store/{id}',
                controller: StorePostController::class,
                deserialize: false,
            ),
            new MetadataPost(
                controller : StorePutController::class,
                deserialize: false,
            ),
        ])]
class Store
{
    #[ORM\Id]
    #[ORM\Column(type: "string", unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]  
    #[ORM\CustomIdGenerator(class: 'App\Doctrine\Base58UuidGenerator')]
    private string $id;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $nameStore = null;

    #[ORM\Column(length: 255)]
    private ?string $storeType = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\ManyToMany(targetEntity: ShoppingCenter::class, mappedBy: 'stores')]
    private Collection $shoppingCenters;

    public function __construct()
    {
        $this->shoppingCenters = new ArrayCollection();
    }


    public function getId(): ?string
    {
        return $this->id;
    }

    public function getNameStore(): ?string
    {
        return $this->nameStore;
    }

    public function setNameStore(?string $nameStore): static
    {
        $this->nameStore = $nameStore;

        return $this;
    }

    public function getStoreType(): ?string
    {
        return $this->storeType;
    }

    public function setStoreType(string $storeType): static
    {
        $this->storeType = $storeType;

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

    /**
     * @return Collection<int, ShoppingCenter>
     */
    public function getShoppingCenters(): Collection
    {
        return $this->shoppingCenters;
    }

    public function addShoppingCenter(ShoppingCenter $shoppingCenter): static
    {
        if (!$this->shoppingCenters->contains($shoppingCenter)) {
            $this->shoppingCenters->add($shoppingCenter);
            $shoppingCenter->addStore($this);
        }

        return $this;
    }

    public function removeShoppingCenter(ShoppingCenter $shoppingCenter): static
    {
        if ($this->shoppingCenters->removeElement($shoppingCenter)) {
            $shoppingCenter->removeStore($this);
        }

        return $this;
    }


}
