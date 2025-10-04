<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('dashboardBL', function () {
        return Inertia::render('dashboardBL');
})->name('dashboardBL');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


//BL

Route::get('BLproductosInventario/BLProductos', function () {
        return Inertia::render('BLProductos');
})->name('BLProductos');

Route::get('BLproductosInventario/BLAnalisis', function () {
        return Inertia::render('BLAnalisis');
})->name('BLAnalisis');

Route::get('BLproductosInventario/BLHistorico', function () {
        return Inertia::render('BLHistorico');
})->name('BLHistorico');

Route::get('BLproductosInventario/BLPedidos', function () {
        return Inertia::render('BLPedidos');
})->name('BLPedidos');

Route::get('BLproductosInventario/BLClientes', function () {
        return Inertia::render('BLClientes');
})->name('BLClientes');

Route::get('BLproductosInventario/BLMarcacion', function () {
        return Inertia::render('BLMarcacion');
})->name('BLMarcacion');

Route::get('BLproductosInventario/BLCuentaCobro', function () {
        return Inertia::render('BLCuentaCobro');
})->name('BLCuentaCobro');

Route::get('BLproductosInventario/BLInventario', function () {
        return Inertia::render('BLInventario');
})->name('BLInventario');



//AZZU


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
