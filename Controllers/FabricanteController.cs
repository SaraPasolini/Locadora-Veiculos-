using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VendaVeiculosApi.Data;
using VendaVeiculosApi.DTOs;
using VendaVeiculosApi.Models;

namespace VendaVeiculosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FabricanteController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public FabricanteController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet] // geral
    public async Task<ActionResult<IEnumerable<FabricanteDTO>>> Get()
    {
        var list = await _context.Fabricantes.ToListAsync();
        return Ok(_mapper.Map<List<FabricanteDTO>>(list));
    }

    [HttpGet("{id}")] // Get por id
    public async Task<ActionResult<FabricanteDTO>> Get(int id)
    {
        var item = await _context.Fabricantes.FindAsync(id);
        if (item == null) return NotFound();
        return Ok(_mapper.Map<FabricanteDTO>(item));
    }

    [HttpGet("nome/{nome}")] // Get por nome
    public async Task<ActionResult<IEnumerable<FabricanteDTO>>> GetByName(string nome)
    {
        var list = await _context.Fabricantes
            .Where(f => f.Nome.Contains(nome))
            .ToListAsync();
        return Ok(_mapper.Map<List<FabricanteDTO>>(list));
    }

    [HttpPost] // criar fabricante
    public async Task<ActionResult<FabricanteDTO>> Post(FabricanteDTO dto)
    {
        var entity = _mapper.Map<Fabricante>(dto);
        _context.Fabricantes.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, _mapper.Map<FabricanteDTO>(entity));
    }

    

    [HttpPut("{id}")] // atualiza pegando o ID
    public async Task<IActionResult> Put(int id, FabricanteDTO dto)
    {
        if (id != dto.Id) return BadRequest();
        var entity = await _context.Fabricantes.FindAsync(id);
        if (entity == null) return NotFound();
        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")] // Deleta pelo ID
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _context.Fabricantes.FindAsync(id);
        if (entity == null) return NotFound();
        _context.Fabricantes.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();

    }
}
