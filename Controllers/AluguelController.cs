using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VendaVeiculosApi.Data;
using VendaVeiculosApi.DTOs;
using VendaVeiculosApi.Models;

namespace VendaVeiculosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AluguelController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public AluguelController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet] // Get geral
    public async Task<ActionResult<IEnumerable<AluguelDTO>>> Get()
    {
        var list = await _context.Alugueis.Include(a => a.Cliente).Include(a => a.Veiculo).ToListAsync();
        return Ok(_mapper.Map<List<AluguelDTO>>(list));
    }

    [HttpGet("{id}")] // Get por id
    public async Task<ActionResult<AluguelDTO>> GetId(int id)
    {
        var entity = await _context.Alugueis.Include(a => a.Cliente).Include
            (a => a.Veiculo).FirstOrDefaultAsync(a => a.Id == id);
        if (entity == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<AluguelDTO>(entity));
    }

    [HttpPost] // criar aluguel
    public async Task<ActionResult<AluguelDTO>> Post(AluguelDTO dto)
    {
        var entity = _mapper.Map<Aluguel>(dto);
        _context.Alugueis.Add(entity);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, _mapper.Map<AluguelDTO>(entity));
    }

    // Delete
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entity = await _context.Alugueis.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        _context.Alugueis.Remove(entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // PUT
    [HttpPut("{id}")] // atualizar
    public async Task<IActionResult> Put(int id, AluguelDTO dto)
    {
        if (id != dto.Id)
        {
            return BadRequest();
        }

        var entity = await _context.Alugueis.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }

        _mapper.Map(dto, entity);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
