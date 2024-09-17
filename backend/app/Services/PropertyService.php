<?php

namespace App\Services;

use App\Models\Property;
use Illuminate\Http\Request;
use PHPUnit\Util\Exception;

class PropertyService
{
    public function getAll()
    {
           return $properties = Property::all();
    }

    public function search(Request $request){
        $title = $request->input('title');
        $description = $request->input('description');
        $size = $request->input('size');
        $city = $request->input('city');
        $street = $request->input('street');
        $houseNumber = $request->input('house_number');
        $rooms = $request->input('rooms');
        $bathroomCount = $request->input('bathroom_count');
        $floor = $request->input('floor');
        $buildingMaterial = $request->input('building_material');
        $type = $request->input('type');
        $plotSize = $request->input('plot_size');
        $garage = $request->input('garage');
        $facing = $request->input('facing');
        $price = $request->input('price');

        $query = Property::query();

        if ($title) {
            $query->where('title', 'like', '%' . $title . '%');
        }
        if ($description) {
            $query->where('description', 'like', '%' . $description . '%');
        }
        if ($size) {
            $query->where('size', '=', $size);
        }
        if ($city) {
            $query->where('city', 'like', '%' . $city . '%');
        }
        if ($street) {
            $query->where('street', 'like', '%' . $street . '%');
        }
        if ($houseNumber) {
            $query->where('house_number', 'like', '%' . $houseNumber . '%');
        }
        if ($rooms) {
            $query->where('rooms', '<=', $rooms);
        }
        if ($bathroomCount) {
            $query->where('bathroom_count', '<=', $bathroomCount);
        }
        if ($floor) {
            $query->where('floor', '<=', $floor);
        }
        if ($buildingMaterial) {
            $query->where('building_material', 'like', '%' . $buildingMaterial . '%');
        }
        if ($type) {
            $query->where('type', 'like', '%' . $type . '%');
        }
        if ($plotSize) {
            $query->where('plot_size', '<=', $plotSize);
        }
        if ($garage !== null) { // Check for null explicitly
            $query->where('garage', $garage);
        }
        if ($facing) {
            $query->where('facing', 'like', '%' . $facing . '%');
        }
        if ($price) {
            $query->where('price', '<=', $price);
        }


        return $query;
    }

    public function getPropertyTypes()
    {
        $propertyTypes = Property::select('type')->distinct()->get();
        $typesArray = array();
        foreach ($propertyTypes as $propertyType) {
            $typesArray[] = $propertyType->type;
        }
        return $typesArray;
    }

    public function add(Request $request, $user_id)
    {
        $property = Property::create([
            'title' => $request->title,
            'user_id' => $user_id,
            'description' => $request->description,
            'size' => $request->size,
            'city' => $request->city,
            'street' => $request->street,
            'house_number' => $request->house_number,
            'rooms' => $request->rooms,
            'bathroom_count' => $request->bathroom_count,
            'floor' => $request->floor,
            'building_material' => $request->building_material,
            'type' => $request->type,
            'plot_size' => $request->plot_size,
            'garage' => $request->garage,
            'facing' => $request->facing,
            'price' => $request->price,
        ]);
        return $property;
    }

    public function delete($id){

       return Property::where('id', $id)->delete();

    }

    public function get($id)
    {
        return Property::where('id', $id)->first();
    }
}
