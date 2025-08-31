<?php

namespace App\Controller;

use App\Entity\MessageAudio;
use App\Entity\MessagePicture;
use App\Entity\Post;
use App\Entity\Image;
use App\Entity\Survey;
use App\Entity\Message;
use App\Entity\Thumbnail;
use App\Entity\FileResource;
use App\Entity\SurveyChoice;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Api\IriConverterInterface;
use Symfony\Component\HttpFoundation\Request;
use Vich\UploaderBundle\Handler\UploadHandler;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;


#[AsController]
class AddMessageController extends AbstractController
{
    private $entityManager;
    private $uploadHandler;

    public function __construct(EntityManagerInterface $entityManager, UploadHandler $uploadHandler, private IriConverterInterface $iriConverter)
    {
        $this->entityManager = $entityManager;
        $this->uploadHandler = $uploadHandler;
    }

    public function __invoke(Request $req): Message
    {

        $msg = new Message();
        $requestMsg = $req->request;
        $survey = $requestMsg->get('');

        // dd($survey);



        if ($authorIri = $requestMsg->get(key: 'author')) {
            $msg->setAuthor($this->iriConverter->getResourceFromIri($authorIri));
        }
        if ($discussionIri = $requestMsg->get(key: 'discussion')) {
            $msg->setDiscussion($this->iriConverter->getResourceFromIri($discussionIri));
        }

        if ($audio = $req->files->get('audio')) {
            $msgAudio = new MessageAudio();
            $msgAudio->setFile($audio)
                ->setFolder('msgAudios');
            $msg->setAudio($msgAudio);
        } else {
            $msg->setContent($requestMsg->get(key: 'content'));

            if ($pictures = $req->files->get('pictures')) {
                foreach ($pictures as $p) {
                    $msgPicture = new MessagePicture();
                    $msgPicture->setFile($p);
                    $msgPicture->setFolder('msgPictures');
                    $msg->addPicture($msgPicture);
                }
            }
        }


        return $msg;
    }
}

