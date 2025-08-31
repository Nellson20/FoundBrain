<?php

namespace App\Entity;

use App\Repository\MessagePictureRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\ImageEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: MessagePictureRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[vich\Uploadable]
class MessagePicture extends ImageEntity
{
    #[Vich\UploadableField(mapping: 'msg_picture', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\ManyToOne(inversedBy: 'pictures')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Message $message = null;


    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): static
    {
        $this->file = $file;

        return $this;
    }

    public function getMessage(): ?Message
    {
        return $this->message;
    }

    public function setMessage(?Message $message): static
    {
        $this->message = $message;

        return $this;
    }

}
