<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use PHPUnit\Util\Exception;

class PropertyController extends Controller
{
    public function getAllProperties(){
        try {
        $properties = Property::all();

        return response()->json($properties, 200);
        }catch (\Exception $e){
            return response()->json(["error" => $e->getMessage()], 500);
        }
    }

  public function addProperty(Request $request)
  {
      try{
          $id =\auth('sanctum')->user()->id;
            var_dump($request->houser_number);
          $property = Property::create([
              'title'=>$request->title,
              'user_id'=>$id,
              'description'=>$request->description,
              'size'=>$request->size,
              'city'=>$request->city,
              'street'=>$request->street,
              'house_number'=>$request->house_number,
              'rooms'=>$request->rooms,
              'bathroom_count'=>$request->bathroom_count,
              'floor'=>$request->floor,
              'building_material'=>$request->building_material,
              'type'=>$request->type,
              'plot_size'=>$request->plot_size,
              'garage'=>$request->garage,
              'facing'=>$request->facing,
              'price'=>$request->price,
          ]);

          return response()->json([
              'status' => true,
              'message' => 'Property added successfully',
              $property
          ], 200);
      }catch (\Exception $e){
          return response()->json(["error" => $e->getMessage()], 500);
      }
  }

public function deleteProperty ($request)
{
    try{
        $id = $request->id;
        Property::where('id', $id)->delete();
        return response()->json(['message' => 'Property deleted successfully']);
    }catch(Exception $e){
        return response()->json(["error" => $e->getMessage()], 500);
    }

}

}
