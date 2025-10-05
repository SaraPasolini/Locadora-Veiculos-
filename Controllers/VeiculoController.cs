using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VendaVeiculosApi.Data;
using VendaVeiculosApi.DTOs;
using VendaVeiculosApi.Models;

namespace VendaVeiculosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VeiculoController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public VeiculoController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet] // Get geral
    public async Task<ActionResult<IEnumerable<VeiculoDTO>>> Get()
    {
        var list = await _context.Veiculos.Include(v => v.Fabricante).ToListAsync();
        return Ok(_mapper.Map<List<VeiculoDTO>>(list));
    }

    [HttpGet("{id}")] // Get por id
    public async Task<ActionResult<VeiculoDTO>> GetId(int id)
    {
        var entity = await _context.Veiculos.Include(v => v.Fabricante).FirstOrDefaultAsync(v => v.Id == id);
        if (entity == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<VeiculoDTO>(entity));
    }

    [HttpPost]
    public async Task<ActionResult<VeiculoDTO>> Post(VeiculoDTO dto)
    {
        var entity = _mapper.Map<Veiculo>(dto);
        _context.Veiculos.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, _mapper.Map<VeiculoDTO>(entity));
    }

    // Get por fabricante
    [HttpGet("by-manufacturer/{fabricanteId}")]
    public async Task<ActionResult<IEnumerable<VeiculoDTO>>> GetByManufacturer(int fabricanteId)
    {
        var list = await _context.Veiculos.Where(v => v.FabricanteId == fabricanteId).ToListAsync();
        return Ok(_mapper.Map<List<VeiculoDTO>>(list));
    }

    // Delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _context.Veiculos.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        _context.Veiculos.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }

     // PUT
    [HttpPut("{id}")] // atualizar
    public async Task<IActionResult> Put(int id, VeiculoDTO dto)
    {
        if (id != dto.Id)
        {
            return BadRequest();
        }
        var entity = await _context.Veiculos.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

   
