<?php

namespace App\Entity;

use App\Entity\Invest;
use App\Entity\ImageEntity;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Dotenv\Dotenv;
use ApiPlatform\Metadata\ApiResource;
use App\Controller\InvestPictureController;
use App\Repository\InvestPictureRepository;
use ApiPlatform\Metadata\Post as MetadataPost;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: InvestPictureRepository::class)]
#[HasLifecycleCallbacks]
#[ApiResource(
    operations:[
        new Get(),
        new Put(),
        new Patch(),
        new MetadataPost(
            controller: InvestPictureController::class,
            deserialize: false,
        )
    ]
)]

#[Vich\Uploadable]

class InvestPicture extends ImageEntity
{

    #[vich\UploadableField(mapping: 'invest_picture_upload', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\ManyToOne(inversedBy: 'investPictures')]
    private ?Invest $invest = null;


    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }


    public function getInvest(): ?Invest
    {
        
        return $this->invest;
    }

    public function setInvest(?Invest $invest): static
    {
        $this->invest = $invest;

        return $this;
    }
}
