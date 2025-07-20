<?php

namespace App\Entity;

use App\Repository\MessageAudioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: MessageAudioRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[vich\Uploadable]
class MessageAudio extends Audio
{
    #[Assert\File(
        mimeTypes:["audio/mpeg", "audio/wav", "audio/x-wav"],
        mimeTypesMessage:'Vous devez envoyer un fichier mp3 ou wav'
    )]
    #[Vich\UploadableField(mapping: 'msg_audio', fileNameProperty: 'fileName', size: 'fileSize')]
    private ?File $file = null;

    #[ORM\OneToOne(mappedBy: 'audio', cascade: ['persist', 'remove'])]
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
        // unset the owning side of the relation if necessary
        if ($message === null && $this->message !== null) {
            $this->message->setAudio(null);
        }

        // set the owning side of the relation if necessary
        if ($message !== null && $message->getAudio() !== $this) {
            $message->setAudio($this);
        }

        $this->message = $message;

        return $this;
    }
}
