<?php

namespace App\Controller;

use Assert\Type;
use Assert\NotBlank;
use App\Repository\HotelRepository;
use App\Repository\AuthorRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[AsController]
class StatisticController extends AbstractController
{
    #[Route('/statistic', name: 'app_statistic', methods: ['GET', 'POST'])]
    public function get(Request $request, HotelRepository $hotel, AuthorRepository $author)
    {
        if ($request->isMethod('GET')) {
            $hotels = count($hotel->findAll());
            $authorSimple = count($author->findByAuthorType('user'));
            $authorCompany = count($author->findByAuthorType('company'));
            $authorArtist = count($author->findByAuthorType('artist'));
    
            return $this->json([
                'hotels' => $hotels,
                'authors_simples' => $authorSimple,
                'authors_companies' => $authorCompany,
                'authors_artists' => $authorArtist,
            ]);
        }
    
        if ($request->isMethod('POST')) {
            $requestData = json_decode($request->getContent(), true);

            if (!empty($errors)) {
                return $this->json(['error' => 'Invalid month parameter'], 400);
            }

            $authorPerDate = $author->findByAuthorDateTime($requestData['month']);

            if (empty($authorPerDate)) {
                return $this->json(['error' => 'No authors found for the specified month'], 404);
            }

            return $this->json(['author_per_date' => $authorPerDate]);
        }

        throw new \Exception('Invalid request method.');
    }
}